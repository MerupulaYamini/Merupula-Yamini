package collectionsApp;

import java.util.ArrayList;
import java.util.List;

public class ListCollection {

    private List<String> items;

    public ListCollection() {
        items = new ArrayList<>();
    }

    // Add an element
    public void addItem(String item) {
        items.add(item);
        System.out.println(item + " added to the list.");
    }

    // Remove an element
    public void removeItem(String item) {
        if (items.remove(item)) {
            System.out.println(item + " removed from the list.");
        } else {
            System.out.println(item + " not found in the list.");
        }
    }

    // Search an element
    public boolean searchItem(String item) {
        return items.contains(item);
    }

    // Display all elements
    public void displayItem() {
        System.out.println("List content: " + items);
    }
}
