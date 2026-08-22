import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { profile as defaultProfile, projects as defaultProjects, experience as defaultExperience, skills as defaultSkills, nav, marqueeItems } from '../data';

type DataContextType = {
  profile: any;
  projects: any[];
  experience: any[];
  skills: any;
  nav: any[];
  marqueeItems: string[];
  loading: boolean;
  refreshData: () => Promise<void>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState({
    profile: defaultProfile,
    projects: defaultProjects,
    experience: defaultExperience,
    skills: defaultSkills,
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: supabaseData, error } = await supabase
        .from('portfolio_content')
        .select('*')
        .eq('id', 1)
        .single();

      if (error) {
        console.error('Error fetching data from Supabase:', error);
      } else if (supabaseData) {
        setData({
          profile: supabaseData.profile || defaultProfile,
          projects: supabaseData.projects || defaultProjects,
          experience: supabaseData.experience || defaultExperience,
          skills: supabaseData.skills || defaultSkills,
        });
      }
    } catch (error) {
      console.error('Unexpected error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        ...data,
        nav,
        marqueeItems,
        loading,
        refreshData: fetchData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
