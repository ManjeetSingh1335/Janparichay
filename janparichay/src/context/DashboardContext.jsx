import React,{createContext, useContext, useState, useEffect} from 'react'

const DashboardContext=createContext();

export function DashboardProvider({children}){

  const [profile,setProfile]=useState(()=>{
    const saved_data=localStorage.getItem('mp_user');
    if(saved_data){
      try{
        const parsed=JSON.parse(saved_data);
        return{
          name:parsed.name || '',
          username:parsed.username || '',
          mobile:parsed.mobile || '',
          email:parsed.email || '',
          fullName:parsed.name || '',
          gender:parsed.gender || '',
          dob:parsed.dob || '',
        };
      }catch(e){}
    };
    return{
      name:'',
      username:'',
      mobile:'',
      email:'',
      fullName:'',
      gender:'',
      dob:'',
    };
  }); 

  const [avatar,setAvatar]=useState(()=>{
    return localStorage.getItem('mp_avatar') || null;
  });

  const [settings, setSettings]=useState(()=>{
    const saved_data=localStorage.getItem('mp_settings');
    if(saved_data){
      try{
        const savedSettings = JSON.parse(saved_data);
        return { ...savedSettings, backupCode: false, backupCodeEnabled: false };
      }catch(e){}
    }

    return{
      newDeviceAlert:true,
      passwordlessAuth:true,
      geoFencing:false,
      backupCode:false,
      backupCodeEnabled:false,
      multiFactor:false,
    };
  });

  useEffect(()=>{
    localStorage.setItem('mp_user',JSON.stringify(profile));
  },[profile]);

  useEffect(()=>{
    localStorage.setItem('mp_settings',JSON.stringify(settings));
  },[settings]);

  const updateProfile=(newProfile)=>{
    setProfile(prev=>({...prev, ...newProfile}));
  };

  const updateAvatar=(newAvatar)=>{
    setAvatar(newAvatar);
    if(newAvatar){
      localStorage.setItem('mp_avatar',newAvatar);
    }else{
      localStorage.removeItem('mp_avatar');
    }
  };

  const updateSetting=(key,value)=>{
    setSettings(prev=>({...prev, [key]:value}));
  };

  const resetAccessibility = () => {
    try {
      localStorage.removeItem('jp_accessibility_settings');
      sessionStorage.removeItem('jp_accessibility_settings');
    } catch {}
    delete document.body.dataset.biggerText;
    delete document.body.dataset.textSpacing;
    delete document.body.dataset.lineHeight;
    document.body.classList.remove(
      'acc-highlight-links',
      'acc-dyslexia-mode',
      'acc-hide-images',
      'acc-custom-cursor',
      'acc-dark-mode'
    );
    document.documentElement.classList.remove('acc-invert-colors');
    document.documentElement.style.fontSize = '';
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  };

  const logout=()=>{
    resetAccessibility();
    localStorage.removeItem('mp_user');
    localStorage.removeItem('mp_avatar');
    localStorage.removeItem('user_devices');
    localStorage.removeItem('recent_activities');
    localStorage.removeItem('mp_mfa_devices_count');
    window.location.href='/login';
  };

  const logoutAll=()=>{
    resetAccessibility();
    localStorage.removeItem('mp_user');
    localStorage.removeItem('mp_avatar');
    localStorage.removeItem('user_devices');
    localStorage.removeItem('recent_activities');
    localStorage.removeItem('mp_mfa_devices_count');
    window.location.href='/login';
  };

  const value={
    profile,
    avatar,
    settings,
    updateSetting,
    updateProfile,
    updateAvatar,
    logout,
    logoutAll,
  };

  return(
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );

}

export function useDashboard(){
  const context=useContext(DashboardContext);
  if(!context){
    throw new Error('Error: it must be used within DashboardProvider');
  }
  return context;
}
