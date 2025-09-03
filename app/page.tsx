'use client';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Image Search Abstraction Layer</h1>
      
      <section>
        <h2>User Stories:</h2>
        <ul>
          <li>I can get the image URLs, description and page URLs for a set of images relating to a given search string.</li>
          <li>I can paginate through the responses by adding a ?page=2 parameter to the URL.</li>
          <li>I can get a list of the most recently submitted search strings.</li>
        </ul>
      </section>

      <section>
        <h2>Example usage:</h2>
        <code>
          <a href="/api/search?query=lolcats%20funny&page=10">/api/search?query=lolcats%20funny&page=10</a>
        </code>
      </section>

      <section>
        <h2>Example output:</h2>
        <pre>
{`[
  {
    "id": "image_id",
    "description": "A funny cat doing something hilarious",
    "urls": {
      "regular": "https://images.unsplash.com/..."
    },
    "links": {
      "html": "https://unsplash.com/..."
    }
  }
]`}
        </pre>
      </section>

      <section>
        <h2>Recent searches:</h2>
        <code>
          <a href="/api/recent">/api/recent</a>
        </code>
      </section>

      <section>
        <h2>Example output:</h2>
        <pre>
{`[
  {
    "query": "lolcats funny",
    "timestamp": "2025-09-03T10:00:00.000Z"
  },
  {
    "query": "dogs cute",
    "timestamp": "2025-09-03T09:55:00.000Z"
  }
]`}
        </pre>
      </section>

      <footer>
        <p>by <a href="https://github.com/soufin3raki" target="_blank" rel="noopener noreferrer">Soufiane</a></p>
      </footer>
    </main>
  );
}
