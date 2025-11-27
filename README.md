# Weird-Al-O-Matic – API Application

This project is my API assignment for the course. It uses the Wikipedia REST API to display facts about Weird Al Yankovic. The main idea was to build a small interactive webpage using only the techniques shown in class: HTML, CSS, JavaScript, DOM methods, event listeners, and `fetch()`.

## What the application does
- Shows a dropdown list of Weird Al topics  
- Lets the user pick a topic or choose a random one  
- Uses `fetch()` to request the Wikipedia summary for that topic  
- Displays the results in a simple fact card (image, description, extract, link)  
- Shows loading and error messages when needed  

## API used
Wikipedia REST API  
Summary Endpoint:

```
https://en.wikipedia.org/api/rest_v1/page/summary/{TITLE}
```

## MVP (minimum viable product)
- One HTML page  
- Dropdown of pre-selected Wikipedia titles  
- Fetch API request  
- Show the summary data as text  

## Final goal (completed)
- Add a header image  
- Format the result as a clean fact card  
- Add a thumbnail if available  
- Improve the styles and spacing  
- Add a “Random Fact” button  

## Commit breakdown (GitHub requirement)
1. **Scaffold** – created the basic page and files  
2. **Topics** – added topic list and dropdown  
3. **API** – connected to Wikipedia and showed basic results  
4. **Fact card** – built full card layout and styling  
5. **Polish** – header image, responsive layout, final cleanup  

## How to run the project
No installation required.  
Download the folder and open `index.html` in a browser.
