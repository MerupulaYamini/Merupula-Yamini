package collectiondemo.test;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import collectionsApp.MapCollection;

public class MapCollectionTest {

    private MapCollection map;

    @BeforeEach
    void setUp() {
        map = new MapCollection();
    }

    @Test
    void testAddAndSearchKey() {
        map.addItem("1", "Yamini");
        assertTrue(map.searchKey("1"));
    }

    @Test
    void testRemoveKey() {
        map.addItem("2", "Vijay");
        map.removeItem("2");
        assertFalse(map.searchKey("2"));
    }
}
