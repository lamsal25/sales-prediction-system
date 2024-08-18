// src/app/components/about/Team.js
import React from 'react';
import MemberCard from './MemberCard';

const Team = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'Data Scientist',
      image: '/images/john.jpg',
      description: 'John is a seasoned data scientist with over 10 years of experience in machine learning and predictive analytics. He has a deep understanding of statistical modeling and has been instrumental in developing our core prediction algorithms.',
    },
    {
      name: 'Jane Smith',
      role: 'Frontend Developer',
      image: '/images/john.jpg',
      description: 'Jane specializes in creating intuitive and responsive user interfaces. With a strong background in web development, she ensures that our platforms are both user-friendly and aesthetically pleasing, providing a seamless experience for our clients.',
    },
    {
      name: 'Alice Johnson',
      role: 'Backend Developer',
      image: '/images/john.jpg',
      description: 'Alice is an expert in backend development and system architecture. She is responsible for ensuring the scalability and security of our systems, enabling us to handle large volumes of data efficiently and securely.',
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-2xl font-bold text-center text-indigo-800">Meet Our Team</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <MemberCard key={member.name} {...member} />
        ))}
      </div>
    </section>
  );
};

export default Team;
