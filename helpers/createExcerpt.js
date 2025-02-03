export const createExcerpt = (content, maxNumberOfWords, trailingIndicator = '...') => {
  if(content != undefined){
    const listOfWords = content.trim().split(' ');
    const truncatedContent = listOfWords.slice(0, maxNumberOfWords).join(' ');
    const excerpt = truncatedContent + trailingIndicator;
    const output = listOfWords.length > maxNumberOfWords ? excerpt : content;
    return output;
  }else{
    return null
  }
  
};