import json
from bs4 import BeautifulSoup

html_content = """
"""

def extract_player_data(html_content):
    """
    Parses HTML content to extract player names and image URLs.

    Args:
        html_content (str): The HTML string containing player list data.

    Returns:
        str: A JSON formatted string with a list of dictionaries,
             each having 'name' and 'image' keys.
    """
    soup = BeautifulSoup(html_content, 'html.parser')
    player_list = []

    # Find all list items representing a player
    # The players are in <li> elements within the main <ul>
    for li in soup.find_all('li'):
        
        # 1. Extract Player Name
        # The name is split into two <p> tags inside the player info div
        name_div = li.find('div', class_='bg-tertiary')
        
        if name_div:
            # Find the two <p> tags that contain the name parts
            name_parts = name_div.find_all('p', class_=['text-caption', 'text-subtitle'])
            
            if len(name_parts) >= 2:
                # First part (first name)
                first_name = name_parts[0].get_text(strip=True)
                # Second part (last name)
                last_name = name_parts[1].get_text(strip=True)
                # Combine and format the full name
                full_name = f"{first_name} {last_name}"
            else:
                full_name = "Name Not Found"
        else:
            full_name = "Name Not Found"


        # 2. Extract Image URL
        # The URL is in the 'src' attribute of the <img> tag
        img_tag = li.find('img')
        image_url = img_tag.get('src') if img_tag else "Image URL Not Found"
        
        # Add the extracted data to the list
        player_list.append({
            "name": full_name,
            "image": image_url
        })
        
    # Return the list formatted as a JSON string
    return json.dumps(player_list, indent=4)

# Run the extraction function and print the result
json_output = extract_player_data(html_content)
print(json_output)