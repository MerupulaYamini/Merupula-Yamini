package collectionsApp;

import java.util.HashSet;
import java.util.Set;

public class SetCollection {

    private Set<String> items;

    public SetCollection() {
        items = new HashSet<>();
    }

    // Add an element
    public void addItem(String item) {
        if (items.add(item)) {
            System.out.println(item + " added to the set.");
        } else {
            System.out.println(item + " already exists in the set.");
        }
    }

    // Remove an element
    public void removeItem(String item) {
        if (items.remove(item)) {
            System.out.println(item + " removed from the set.");
        } else {
            System.out.println(item + " not found in the set.");
        }
    }

    // Search an element
    public boolean searchItem(String item) {
        return items.contains(item);
    }

    // Display all elements
    public void displayItem() {
        System.out.println("Set contents: " + items);
    }
}
