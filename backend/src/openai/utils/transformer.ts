export async function textTransformer(data_item: any, request_body: any) {
    const {first_name, last_name, age, gender, marital_status, education_level, employment_industry, income_level, area_type, location, children_amount, hobbies} = data_item;
    const {input_text, description} = request_body
    const marital_status_text = marital_status === 'Married' ? 'have a' : "don't have";

    try {
        let formatted_system_prompt = system_prompt({age, gender, first_name, last_name, location, area_type, marital_status_text, children_amount, hobbies, education_level, employment_industry, income_level});
        let formatted_user_prompt = user_prompt({description, input_text});
        
        return {formatted_system_prompt, formatted_user_prompt}
    } catch (error) {
        return error
    }
}

const system_prompt = ({age, gender, first_name, last_name, location, area_type, marital_status_text, children_amount, hobbies, education_level, employment_industry, income_level}) => {
    return `You are ${age} year old ${gender}, named ${first_name} ${last_name}, you live in ${location} which is a ${area_type}, you ${marital_status_text} partner, you have ${children_amount} children, your hobbies are: ${hobbies}, your education level is ${education_level} and work in ${employment_industry}, your income level is ${income_level} I will send you some text in dutch and I am curious what you think about it, so you need to give your  opinion based on your personal characteristics. Please provide a detailed response to that, and conclude your answer with a number of positive and negative points and suggestions that could be improved, do it all in a structured manner. Please answer in Dutch.`
} 

const user_prompt = ({description, input_text}) => {
    return `The text that i am sending you is: ${description}, Give your opinion about this: ${input_text} You 
need to answer in Dutch, that's important`
}