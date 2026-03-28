import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CertificateGenerator } from './CertificateGenerator';

type CertificateData = {
  userName: string;
  testName: string;
  date: string;
  score: string;
  resultType: string;
};

const CertificatePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [data, setData] = useState<CertificateData | null>(null);

  useEffect(() => {
    const userName =
      searchParams.get('userName') || 'Certificate Holder';

    const testName =
      searchParams.get('testName') || 'Professional Skill Assessment';

    const date =
      searchParams.get('date') ||
      new Date().toLocaleDateString('en-PK', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });

    const score =
      searchParams.get('score') || 'Successfully Completed';

    const resultType =
      searchParams.get('resultType') || 'PASS';

    // sessionStorage se data ho to use karo
    const storedData = sessionStorage.getItem('certificateData');

    if (storedData) {
      try {
        setData(JSON.parse(storedData));
      } catch {
        setData({ userName, testName, date, score, resultType });
      }
    } else {
      setData({ userName, testName, date, score, resultType });
    }
  }, [searchParams]);

  if (!data) {
    return (
      <div className="min-h-screen bg-green-100 flex items-center justify-center text-green-900 text-lg">
        Preparing Certificate...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center px-2 sm:px-6">
      <CertificateGenerator 
        {...data} 
        onClose={() => navigate('/app')} 
      />
    </div>
  );
};

export default CertificatePage;