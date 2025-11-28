package collectionsApp;

public class JavaCollections {

    public static void main(String[] args) {
        // List Collection
        System.out.println(" \n***********List Collection*********** ");
        ListCollection list = new ListCollection();
        list.addItem("Tomata");
        list.addItem("Potato");
        list.addItem("Carrot");
        list.addItem("Carrot"); // duplicate allowed
        list.displayItem();
        System.out.println("Search Tomata: " + list.searchItem("Tomata"));
        list.removeItem("Tomata");
        list.displayItem();

        // Set Collection
        System.out.println("\n***********Set Collection*********** ");
        SetCollection set = new SetCollection();
        set.addItem("Dog");
        set.addItem("Cat");
        set.addItem("Monkey");
        set.addItem("Dog"); // duplicate not allowed
        set.displayItem();
        System.out.println("Search Cat: " + set.searchItem("Ca"));
        set.removeItem("ant");
        set.displayItem();

        // Map Collection
        System.out.println("\n***********Map Collection*********** ");
        MapCollection map = new MapCollection();
        map.addItem("1", "Yamini");
        map.addItem("2", "Vijay");
        map.addItem("3", "Sangeetha");
        map.displayItem();
        System.out.println("Search key 1: " + map.searchKey("1"));
        map.removeItem("2");
        map.displayItem();
    }
}
