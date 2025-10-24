package collectionsApp;

import java.util.HashMap;
import java.util.Map;

public class MapCollection {

    private Map<String, String> items;

    public MapCollection() {
        items = new HashMap<>();
    }

    // Add a key-value pair
    public void addItem(String key, String value) {
        items.put(key, value);
        System.out.println("Added: " + key + " ---> " + value);
    }

    // Remove a key
    public void removeItem(String key) {
        if (items.containsKey(key)) {
            items.remove(key);
            System.out.println("Removed key: " + key);
        } else {
            System.out.println(key + " not found in the map.");
        }
    }

    // Search a key
    public boolean searchKey(String key) {
        return items.containsKey(key);
    }

    // Display all key-value pairs
    public void displayItem() {
        System.out.println("Map contents: " + items);
    }
}
