import axios from 'axios';

export const getSPMData = async (bpm, timeSignature) => {
  try {
    const response = await axios.get(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Conversions`, {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}` },
      params: { filterByFormula: `{BPM} = ${bpm}` },
    });

    const data = response.data.records[0]?.fields;

    let spm1;

   switch (timeSignature) {
    
        case 1:
        spm1 = data["fx"];
        break;
        case 3: 
        spm1 = data["fx3"];
        break;       
        case 4:
        spm1 = data["fx"];
        break;
        default:
          console.warn(`Unexpected time signature: ${timeSignature}`);
          spm1 = null;
   }
    
    // Adjust this to return only the specific SPM property you need
    console.log('Airtable Data:', data); // Log for debugging
    return [ spm1 ];
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
    throw error;
  }
};
