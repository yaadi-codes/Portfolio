import './about-hobbies-view.css';

interface Hobby {
  icon: string;
  title: string;
  description: string;
  previewItems: string[]; // Items shown on hover
}

const hobbies: Hobby[] = [
  {
    icon: '🎮',
    title: 'Gaming',
    description: 'Exploring virtual worlds and competitive gaming',
    previewItems: ['Chess', 'PUBG', 'Call of Duty', 'Strategy Games'],
  },
  {
    icon: '📚',
    title: 'Reading',
    description: 'Tech blogs, documentation, and self-improvement',
    previewItems: ['12 Pillars of Success', 'Clean Code', 'Atomic Habits', 'Tech Blogs'],
  },
  {
    icon: '🎵',
    title: 'Music',
    description: 'Listening to various genres while coding',
    previewItems: ['Reggae', 'Hip-Hop', 'R&B', 'Gospel', 'Lo-fi Beats'],
  },
  {
    icon: '🏃',
    title: 'Fitness',
    description: 'Keeping active with workouts and exercises',
    previewItems: ['Weight Training', 'Jogging', 'Calisthenics'],
  },
  {
    icon: '🎞️',
    title: 'Films',
    description: 'Exploring the world of cinema',
    previewItems: ['Movie', 'TV Show', 'Podcast', 'Anime'],
  },
  {
    icon: '🏗️',
    title: 'Development', 
    description: 'Building and improving myself',
    previewItems: ['Exploring Financial Literacy', 'Understanding Self', 'Socializing', ],
  },
  {
    icon: '🤝',
    title: 'Volunteering',
    description: 'Giving back to the community',
    previewItems: ['Rotaract Member', 'Community Activity', 'Clean-ups', 'School Volunteerism'],
  },
  {
    icon: '🖼️',
    title: 'Art',
    description: 'Creating visual art and exploring different mediums',
    previewItems: ['Drawing' ]
  }
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
            
            {/* Preview slides up on hover */}
            <div className="hobby-preview">
              <ul className="preview-list">
                {hobby.previewItems.map((item, i) => (
                  <li key={i} className="preview-item">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutHobbiesView;
