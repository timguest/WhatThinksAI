import { getRandomInt } from './random';

export async function textTransformer(data_item: any, request_body: any) {
    const { ageRange, gender, marital_status, education_level, employment_industry, income_level, area_type, location, children_amount, hobbies } = data_item;
    const { input_text, description } = request_body;
    const marital_status_text = marital_status === 'Married' ? 'have a' : "don't have";

    // Generate a random age within the specified range or use a default range
    const [lowerLimit, upperLimit] = ageRange ? ageRange.split('-').map(Number) : [20, 30];
    const age = { lowerLimit, upperLimit };

    try {
        const formatted_prompt = combined_prompt({ age, gender, first_name: data_item.first_name, last_name: data_item.last_name, location, area_type, marital_status_text, children_amount, hobbies, education_level, employment_industry, income_level, description, input_text });

        return { formatted_prompt };
    } catch (error) {
        return error;
    }
}


const combined_prompt = ({ age, gender, first_name, last_name, location, area_type, marital_status_text, children_amount, hobbies, education_level, employment_industry, income_level, description, input_text }) => {
    return `You need to pretend like You are ${age} year old ${gender}, named ${first_name} ${last_name}, you live in ${location} which is a ${area_type}, you ${marital_status_text} partner, you have ${children_amount} children, your hobbies are: ${hobbies}, your education level is ${education_level} and work in ${employment_industry}, your income level is ${income_level}. 

  The text that I am sending you is: ${description}. Please give your opinion about this: ${input_text}. You need to answer in Dutch; that's important.`;
};
