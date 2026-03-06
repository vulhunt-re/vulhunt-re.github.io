(function() {
  var searchIndex = null;
  var searchModal = null;
  var searchInput = null;
  var searchResults = null;
  var selectedIndex = -1;

  function init() {
    searchModal = document.getElementById('search-modal');
    searchInput = document.getElementById('search-input');
    searchResults = document.getElementById('search-results');

    if (!searchModal || !searchInput || !searchResults) return;

    document.querySelectorAll('.search-trigger').forEach(function(btn) {
      btn.addEventListener('click', openSearch);
    });

    var backdrop = searchModal.querySelector('.search-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', closeSearch);
    }

    searchInput.addEventListener('input', debounce(performSearch, 150));
    searchInput.addEventListener('keydown', handleKeydown);

    document.addEventListener('keydown', function(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
      }
      if (e.key === 'Escape' && !searchModal.hidden) {
        closeSearch();
      }
    });
  }

  function loadIndex(callback) {
    if (searchIndex) {
      callback();
      return;
    }

    fetch('/search_index.en.json')
      .then(function(res) { return res.json(); })
      .then(function(data) {
        searchIndex = elasticlunr.Index.load(data);
        callback();
      })
      .catch(function(err) {
        console.error('Failed to load search index:', err);
      });
  }

  function openSearch() {
    searchModal.hidden = false;
    searchInput.value = '';
    searchResults.innerHTML = '';
    selectedIndex = -1;
    searchInput.focus();
    document.body.style.overflow = 'hidden';
    loadIndex(function() {});
  }

  function closeSearch() {
    searchModal.hidden = true;
    document.body.style.overflow = '';
  }

  function toggleSearch() {
    if (searchModal.hidden) {
      openSearch();
    } else {
      closeSearch();
    }
  }

  function performSearch() {
    var query = searchInput.value.trim();

    if (query.length < 2) {
      searchResults.innerHTML = '';
      selectedIndex = -1;
      return;
    }

    if (!searchIndex) {
      loadIndex(function() { performSearch(); });
      return;
    }

    var results = searchIndex.search(query, {
      fields: {
        title: { boost: 2 },
        body: { boost: 1 }
      },
      expand: true
    });

    renderResults(results.slice(0, 10));
  }

  function renderResults(results) {
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
      selectedIndex = -1;
      return;
    }

    var html = results.map(function(result, i) {
      var doc = searchIndex.documentStore.getDoc(result.ref);
      var title = doc.title || 'Untitled';
      var path = result.ref.replace(/\/index\.html$/, '').replace(/\.html$/, '');

      return '<a href="' + result.ref + '" class="search-result' + (i === 0 ? ' selected' : '') + '" data-index="' + i + '">' +
        '<div class="search-result-title">' + escapeHtml(title) + '</div>' +
        '<div class="search-result-path">' + escapeHtml(path) + '</div>' +
        '</a>';
    }).join('');

    searchResults.innerHTML = html;
    selectedIndex = 0;

    searchResults.querySelectorAll('.search-result').forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        selectResult(parseInt(el.dataset.index, 10));
      });
    });
  }

  function selectResult(index) {
    var items = searchResults.querySelectorAll('.search-result');
    if (index < 0 || index >= items.length) return;

    items.forEach(function(el, i) {
      el.classList.toggle('selected', i === index);
    });
    selectedIndex = index;
  }

  function handleKeydown(e) {
    var items = searchResults.querySelectorAll('.search-result');
    var count = items.length;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (count > 0) {
        selectResult((selectedIndex + 1) % count);
        items[selectedIndex].scrollIntoView({ block: 'nearest' });
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (count > 0) {
        selectResult((selectedIndex - 1 + count) % count);
        items[selectedIndex].scrollIntoView({ block: 'nearest' });
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && items[selectedIndex]) {
        items[selectedIndex].click();
      }
    }
  }

  function debounce(fn, delay) {
    var timeout;
    return function() {
      var args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() { fn.apply(null, args); }, delay);
    };
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
