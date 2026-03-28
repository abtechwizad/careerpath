import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Send, MessageSquare, ThumbsUp, User, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';

const API_BASE_URL = 'http://localhost:5000/api';

const CommentSection = ({ roadmapId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchComments();
  }, [roadmapId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/community/comments/${roadmapId}`);
      setComments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!token) {
      toast.error('Please login to comment');
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/community/comments`,
        {
          roadmapId,
          content: newComment
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Add user info to the new comment for immediate display
      const addedComment = {
        ...response.data,
        userId: {
          _id: user._id,
          name: user.name,
          avatarUrl: user.avatarUrl
        }
      };

      setComments([addedComment, ...comments]);
      setNewComment('');
      toast.success('Comment added successfully');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card className="mt-8 border-emerald-100 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
      <CardHeader className="border-b border-emerald-50 bg-emerald-50/50">
        <CardTitle className="text-lg font-bold text-emerald-900 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-emerald-600" />
          Community Discussion
          <span className="text-sm font-normal text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
            {comments.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* New Comment Input */}
        <form onSubmit={handleSubmitComment} className="mb-8 space-y-4">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10 border border-emerald-200">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback className="bg-emerald-100 text-emerald-700">
                {user.name?.charAt(0) || <User className="h-5 w-5" />}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="Share your thoughts or ask a question about this roadmap..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px] border-emerald-100 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
              />
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={!newComment.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 transition-all active:scale-95"
                >
                  <Send className="h-4 w-4" />
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-10 text-emerald-600 animate-pulse">
              Loading discussion...
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/30">
              <MessageSquare className="h-10 w-10 text-emerald-300 mx-auto mb-3" />
              <p className="text-emerald-800 font-medium">No comments yet</p>
              <p className="text-emerald-600 text-sm mt-1">Be the first to start the conversation!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="flex gap-4 group">
                <Avatar className="h-10 w-10 border border-slate-100 transition-transform group-hover:scale-105">
                  <AvatarImage src={comment.userId?.avatarUrl} />
                  <AvatarFallback className="bg-slate-100 text-slate-600 font-bold">
                    {comment.userId?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl rounded-tl-none transition-colors group-hover:bg-slate-100/50">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-slate-900 text-sm">
                        {comment.userId?.name || 'Anonymous User'}
                      </h4>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                        <Clock className="h-3 w-3" />
                        {formatDate(comment.createdAt)}
                      </div>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-2 ml-2">
                    <button className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors">
                      <ThumbsUp className="h-3 w-3" />
                      Helpful ({comment.upvotes || 0})
                    </button>
                    <button className="text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentSection;
