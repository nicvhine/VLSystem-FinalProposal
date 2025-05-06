"use client";

import Image from 'next/image';

const teamMembers = [
    { name: 'Divina Alburo', role: 'Chief Executive Officer', img: '/idPic.jpg' },
    { name: 'Ronelyn Pelayo', role: 'Loan Manager', img: '/idPic.jpg' },
    { name: 'Aiza Valiente', role: 'Loan Officer', img: '/idPic.jpg' },
    { name: 'Rosielle Marie Navares', role: 'Loan Officer', img: '/idPic.jpg' },
    { name: 'Chris Damayo', role: 'Accountant', img: '/idPic.jpg'},
    { name: 'Bernie Gomez', role: 'Accountant', img: '/idPic.jpg'},
    { name: 'Voltair Bracero', role: 'Field Lead', img: '/idPic.jpg' },
    { name: 'Rodelo Lepiten', role: 'Head Collector', img: '/idPic.jpg' },
    { name: 'Shiela May Lepon', role: 'Collector', img: '/idPic.jpg'},
    { name: 'Morgan Thomas', role: 'Collector', img: '/idPic.jpg'},
    { name: 'Ryan Martinez', role: 'Collector', img: '/idPic.jpg'},
    { name: 'Olivia Hernandez', role: 'Collector', img: '/idPic.jpg'},
    { name: 'Kevin Lee', role: 'Collector', img: '/idPic.jpg'},
    { name: 'Amy Gonzalez', role: 'Collector', img: '/idPic.jpg'},
    { name: 'Jason Scott', role: 'Collector', img: '/idPic.jpg'},
    { name: 'Emma Lopez', role: 'Collector', img: '/idPic.jpg'},
];

const TeamSection = () => {
    return (
        <section className="team-section" id='team'>
            <h2 className="team-title">Meet Our Team</h2>
            <div className="team-grid">
                {teamMembers.map((member, index) => (
                    <div className="team-member" key={index}>
                        <Image 
                            src={member.img} 
                            alt={member.name} 
                            width={100} 
                            height={100} 
                            className="team-image" 
                        />
                        <h3>{member.name}</h3>
                        <p>{member.role}</p>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .team-section {
                    padding: 50px 20px;
                    text-align: center;
                    background-color: #f8f9fa;
                }
                .team-title {
                    font-size: 32px;
                    margin-bottom: 20px;
                    color: #333;
                }
                .team-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    max-width: 1000px;
                    margin: 0 auto;
                }
                .team-member {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                    text-align: center; /* Center text */
                    display: flex;
                    flex-direction: column;
                    align-items: center; /* Center items */
                    justify-content: center;
                }
                .team-image {
                    border-radius: 50%;
                    object-fit: cover;
                }
                .team-member h3 {
                    font-size: 18px;
                    margin: 10px 0;
                }
                .team-member p {
                    font-size: 14px;
                    color: #777;
                }
            `}</style>
        </section>
    );
};

export default TeamSection;