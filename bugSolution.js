The solution uses async/await for cleaner error handling.  Always unsubscribe from `onSnapshot` when the component is unmounted.

```javascript
import { getFirestore, doc, getDoc, onSnapshot, Unsubscribe } from 'firebase/firestore';

const db = getFirestore();

async function getData(docId) {
  const docRef = doc(db, 'yourCollection', docId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return docSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching document:', error);
  }
}

let unsubscribe: Unsubscribe | null = null;

function listenForChanges(docId, setDocumentData) {
  const docRef = doc(db, 'yourCollection', docId);
  unsubscribe = onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      setDocumentData(doc.data());
    } else {
      setDocumentData(null);
    }
  });
}

function cleanupListener() {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
}

// Example usage in a React component:
// useEffect(() => {
//   listenForChanges('yourDocId', setDocumentData);
//   return cleanupListener;
// }, []);

//Call function
getData('yourDocId')
.then(data => console.log(data))
.catch(error => console.error(error));
```