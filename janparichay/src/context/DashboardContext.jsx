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
        return JSON.parse(saved_data);
      }catch(e){}
    }

    return{
      newDeviceAlert:true,
      passwordlessAuth:true,
      geoFencing:false,
      backupCode:false,
      multiFactor:false,
    };
  });

  useEffect(()=>{
    localStorage.setItem('mp_user',JSON.stringify(profile));
  },[profile]);

  useEffect(()=>{
    localStorage.setItem('mp_settings',JSON.stringify(settings))
  },[settings]);

  const updateProfile=(newProfile)=>{
    setProfile(prev=>({...prev, ...newProfile}));
  }

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
  }

  const logout=()=>{
    localStorage.removeItem('mp_user');
    localStorage.removeItem('mp_avatar');
    localStorage.removeItem('mp_settings');
    localStorage.removeItem('user_devices');
    localStorage.removeItem('recent_activities');
    window.location.href='/login';
  }

  const logoutAll=()=>{
    localStorage.removeItem('mp_user');
    localStorage.removeItem('mp_avatar');
    localStorage.removeItem('mp_settings');
    localStorage.removeItem('user_devices');
    localStorage.removeItem('recent_activities');
    window.location.href='/login';
  }

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
    throw new error('Error:it must be used within DashboardProvider');
  }
  return context;
}
