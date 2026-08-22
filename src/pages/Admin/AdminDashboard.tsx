import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { supabase } from '../../lib/supabase';

const AdminDashboard = () => {
  const { profile, projects, experience, skills, refreshData } = useData();
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'experience' | 'skills'>('profile');
  
  // Local state for the textareas (as formatted JSON strings)
  const [localData, setLocalData] = useState({
    profile: JSON.stringify(profile, null, 2),
    projects: JSON.stringify(projects, null, 2),
    experience: JSON.stringify(experience, null, 2),
    skills: JSON.stringify(skills, null, 2),
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    // Sync local state when context data updates
    setLocalData({
      profile: JSON.stringify(profile, null, 2),
      projects: JSON.stringify(projects, null, 2),
      experience: JSON.stringify(experience, null, 2),
      skills: JSON.stringify(skills, null, 2),
    });
  }, [profile, projects, experience, skills]);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      // Validate JSON before saving
      const parsedProfile = JSON.parse(localData.profile);
      const parsedProjects = JSON.parse(localData.projects);
      const parsedExperience = JSON.parse(localData.experience);
      const parsedSkills = JSON.parse(localData.skills);

      const { error } = await supabase
        .from('portfolio_content')
        .update({
          profile: parsedProfile,
          projects: parsedProjects,
          experience: parsedExperience,
          skills: parsedSkills,
        })
        .eq('id', 1);

      if (error) throw error;
      
      setMessage({ text: 'Changes saved successfully!', type: 'success' });
      await refreshData();
    } catch (err: any) {
      setMessage({ text: err.message || 'Invalid JSON format', type: 'error' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
  ] as const;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">Content Editor</h2>
          <p className="text-fg/60 mt-2">Edit your portfolio content directly as JSON.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-black px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
          {message.text}
        </div>
      )}

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="flex border-b border-white/10 bg-white/5">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-primary text-primary bg-white/5'
                  : 'text-fg/60 hover:text-fg hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="p-4">
          <textarea
            className="w-full h-[600px] bg-black/50 border border-white/10 rounded-lg p-4 text-sm font-mono text-fg focus:outline-none focus:border-primary resize-y"
            value={localData[activeTab]}
            onChange={(e) => setLocalData({ ...localData, [activeTab]: e.target.value })}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
