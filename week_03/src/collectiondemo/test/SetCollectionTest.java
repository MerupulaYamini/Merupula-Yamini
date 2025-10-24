package collectiondemo.test;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import collectionsApp.SetCollection;

public class SetCollectionTest {

    private SetCollection set;

    @BeforeEach
    void setUp() {
        set = new SetCollection();
    }

    @Test
    void testAddUniqueItem() {
        set.addItem("Dog");
        assertTrue(set.searchItem("Dog"));
    }

    @Test
    void testDuplicateNotAdded() {
        set.addItem("Cat");
        set.addItem("Cat"); // duplicate
        assertTrue(set.searchItem("Cat"));
    }

    @Test
    void testRemoveItem() {
        set.addItem("Monkey");
        set.removeItem("Monkey");
        assertFalse(set.searchItem("Monkey"));
    }
}
