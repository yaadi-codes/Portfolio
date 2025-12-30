import './about-hobbies-view.css';

interface Hobby {
  icon: string;
  title: string;
  description: string;
}

const hobbies: Hobby[] = [
  {
    icon: '🎮',
    title: 'Gaming',
    description: 'Exploring virtual worlds and competitive gaming',
  },
  {
    icon: '📚',
    title: 'Reading',
    description: 'Tech blogs, documentation, and sci-fi novels',
  },
  {
    icon: '🎵',
    title: 'Music',
    description: 'Listening to various genres while coding',
  },
  {
    icon: '🏃',
    title: 'Fitness',
    description: 'Keeping active with workouts and sports',
  },
];

const AboutHobbiesView = () => {
  return (
    <div className="about-hobbies-view">
      <p className="view-label">Beyond The Code</p>
      <h1 className="view-title">Hobbies & Interests</h1>
      <p className="view-description">
        When I'm not coding, here's what keeps me inspired and balanced
      </p>
      
      <div className="hobbies-grid">
        {hobbies.map((hobby, index) => (
          <div key={index} className="hobby-card">
            <span className="hobby-icon">{hobby.icon}</span>
            <h3 className="hobby-title">{hobby.title}</h3>
            <p className="hobby-description">{hobby.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutHobbiesView;
