package collectiondemo.test;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import collectionsApp.ListCollection;

public class ListCollectionTest {

    private ListCollection list;

    @BeforeEach
    void setUp() {
        list = new ListCollection();
    }

    @Test
    void testAddItem() {
        list.addItem("Tomato");
        assertTrue(list.searchItem("Tomato"));
    }

    @Test
    void testRemoveItem() {
        list.addItem("Potato");
        list.removeItem("Potato");
        assertFalse(list.searchItem("Potato"));
    }

    @Test
    void testSearchItemNotFound() {
        assertFalse(list.searchItem("Carrot"));
    }
}
