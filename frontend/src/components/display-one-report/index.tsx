import React from "react";

const DisplayOneReport = ({content}:any) => {
    function regexTransformation(dutchText:any) {        
        const matches = dutchText.match(/^(.*?)Positieve punten:(.*?)(Negatieve punten:.*?)?(Suggesties voor verbetering:.*)?$/s);
        
        if (matches && matches?.length === 3) {
            const content = matches[1]?.trim() || '';
            const positive = matches[2]?.trim() || '';
            const negative = matches[3]?.trim() || '';
          
            return { text: content, positive: positive, negative: negative };
        } else {            
            return dutchText;
        }
        
      }

      const updated_text = regexTransformation(content);
      const { text, positive, negative } = updated_text
    
    return (
        <div className="container mx-auto py-0 px-4">
            <p className="text-base font-semibold mb-4">Content:</p>
            <div>
                { text && positive && negative ? 
                    <div>
                        <div>{text}</div>
                        <div>{positive}</div>
                        <div>{negative}</div>
                    </div>
                    :
                    <div>
                        <div className="text-base"> {updated_text} </div>
                    </div>
                }
                
                
            </div>
            
        </div>
    )
}

export default DisplayOneReport;