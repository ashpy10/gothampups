
export const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
  
    const diffTime = today - birthDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;
  
    return `${weeks} weeks and ${days} days`;
  };
