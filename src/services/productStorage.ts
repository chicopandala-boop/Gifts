import { Product } from '../types/store';

const DB_NAME = 'GiftsBoutiqueCatalogDB';
const DB_VERSION = 1;
const STORE_NAME = 'catalogue_products';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Load all stored custom / drive products from IndexedDB.
 */
export async function loadPersistedProducts(): Promise<Product[]> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        resolve(req.result || []);
      };

      req.onerror = () => {
        console.warn('Failed to read from IndexedDB, fallback to empty array');
        resolve([]);
      };
    });
  } catch (err) {
    console.warn('IndexedDB not available:', err);
    // Fallback: check localStorage for small metadata
    try {
      const saved = localStorage.getItem('gb_custom_products');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  }
}

/**
 * Persist an array of products into IndexedDB.
 */
export async function persistProducts(products: Product[]): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      // Clear existing items in store and replace with updated set
      store.clear();
      for (const p of products) {
        store.put(p);
      }

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('Failed to persist products to IndexedDB:', err);
    try {
      localStorage.setItem('gb_custom_products', JSON.stringify(products.slice(0, 10)));
    } catch {
      // ignore
    }
  }
}

/**
 * Add a single new product to IndexedDB.
 */
export async function persistSingleProduct(product: Product): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(product);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('Failed to persist single product:', err);
  }
}

/**
 * Delete a product by ID from IndexedDB.
 */
export async function deletePersistedProduct(productId: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete(productId);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('Failed to delete persisted product:', err);
  }
}

/**
 * Clear all persisted custom products.
 */
export async function clearAllPersistedProducts(): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('Failed to clear persisted products:', err);
  }
}
