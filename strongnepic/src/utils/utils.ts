export const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', weekday: 'long', month: 'numeric'  };
    const date = new Date(dateString);
    return date.toLocaleDateString('sv', options);
}; 

export const getMinutes = (startTime: string, endTime: string): number => {
    // Parse the time strings into Date objects
    const startTimeDate = new Date(`1970-01-01T${startTime}`);
    const endTimeDate = new Date(`1970-01-01T${endTime}`);
  
    // Calculate the time difference in milliseconds
    const timeDifference = endTimeDate.getTime() - startTimeDate.getTime();
  
    // Calculate the minutes
    const minutes = Math.floor(timeDifference / (1000 * 60));
  
    return minutes;
 }
 
export function generateUniqueId(): number {
    return Math.floor(Math.random() * 1000000);
  }
  