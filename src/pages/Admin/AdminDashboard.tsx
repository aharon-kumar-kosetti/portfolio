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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="font-display text-4xl font-black tracking-tight">Content Editor</h2>
          <p className="text-muted mt-2">Edit your portfolio content directly as JSON.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-3 font-display text-sm font-bold text-white btn-shadow transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl mb-8 font-medium text-sm flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
          <div className={`h-2 w-2 rounded-full ${message.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`} />
          {message.text}
        </div>
      )}

      <div className="bg-card border border-line rounded-2xl overflow-hidden card-shadow">
        <div className="flex border-b border-line bg-warm/20 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-display font-bold transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-b-2 border-accent text-accent bg-surface'
                  : 'text-muted hover:text-fg hover:bg-warm/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="p-6">
          <textarea
            className="w-full h-[600px] bg-[#1e1e1e] border border-line/50 rounded-xl p-5 text-sm font-mono text-[#d4d4d4] focus:outline-none focus:ring-2 focus:ring-accent/50 resize-y shadow-inner"
            value={localData[activeTab]}
            onChange={(e) => setLocalData({ ...localData, [activeTab]: e.target.value })}
            spellCheck={false}
          />
          <p className="mt-4 font-mono text-xs text-muted">
            Make sure your JSON is valid before saving. Missing commas or quotes will cause an error.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
