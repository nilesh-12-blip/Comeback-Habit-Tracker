export const save = (key, val) => localStorage.setItem(key, JSON.stringify(val));

export const load = (key, def) => { 
  try { 
    const v = localStorage.getItem(key); 
    return v ? JSON.parse(v) : def; 
  } catch { 
    return def; 
  } 
};

export const remove = (key) => localStorage.removeItem(key);

export const clear = () => localStorage.clear();

export const getAllKeys = () => Object.keys(localStorage);
