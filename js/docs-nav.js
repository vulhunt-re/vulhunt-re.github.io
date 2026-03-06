// Docs navigation - collapsible sections
document.addEventListener('DOMContentLoaded', function() {
  // Handle section toggles
  document.querySelectorAll('.docs-nav-section-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.closest('.docs-nav-section');
      section.classList.toggle('collapsed');

      // Save state to localStorage
      const sectionId = section.dataset.section;
      if (sectionId) {
        const collapsed = JSON.parse(localStorage.getItem('docs-nav-collapsed') || '{}');
        collapsed[sectionId] = section.classList.contains('collapsed');
        localStorage.setItem('docs-nav-collapsed', JSON.stringify(collapsed));
      }
    });
  });

  // Handle nested toggles
  document.querySelectorAll('.docs-nav-nested-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const nested = this.closest('.docs-nav-nested');
      nested.classList.toggle('collapsed');

      // Save state to localStorage
      const nestedId = nested.dataset.nested;
      if (nestedId) {
        const collapsed = JSON.parse(localStorage.getItem('docs-nav-collapsed') || '{}');
        collapsed[nestedId] = nested.classList.contains('collapsed');
        localStorage.setItem('docs-nav-collapsed', JSON.stringify(collapsed));
      }
    });
  });

  // Restore collapsed state from localStorage
  const collapsed = JSON.parse(localStorage.getItem('docs-nav-collapsed') || '{}');

  document.querySelectorAll('.docs-nav-section[data-section]').forEach(function(section) {
    const sectionId = section.dataset.section;
    // Default to collapsed unless it contains active link or was explicitly expanded
    const hasActive = section.querySelector('.docs-nav-link.active');
    if (collapsed[sectionId] === true && !hasActive) {
      section.classList.add('collapsed');
    } else if (collapsed[sectionId] === false) {
      section.classList.remove('collapsed');
    } else if (!hasActive) {
      // Default: collapse sections without active items
      section.classList.add('collapsed');
    }
  });

  document.querySelectorAll('.docs-nav-nested[data-nested]').forEach(function(nested) {
    const nestedId = nested.dataset.nested;
    const hasActive = nested.querySelector('.docs-nav-link.active');
    if (collapsed[nestedId] === true && !hasActive) {
      nested.classList.add('collapsed');
    } else if (collapsed[nestedId] === false) {
      nested.classList.remove('collapsed');
    } else if (!hasActive) {
      // Default: collapse nested sections without active items
      nested.classList.add('collapsed');
    }
  });

  // Handle tab toggles
  document.querySelectorAll('.docs-nav-tab-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const group = this.closest('.docs-nav-group');
      group.classList.toggle('collapsed');

      const groupId = group.dataset.tab;
      if (groupId) {
        const collapsed = JSON.parse(localStorage.getItem('docs-nav-collapsed') || '{}');
        collapsed[groupId] = group.classList.contains('collapsed');
        localStorage.setItem('docs-nav-collapsed', JSON.stringify(collapsed));
      }
    });
  });

  // Restore tab collapsed state
  document.querySelectorAll('.docs-nav-group[data-tab]').forEach(function(group) {
    const tabId = group.dataset.tab;
    const hasActive = group.querySelector('.docs-nav-link.active, .docs-nav-tab.active');
    if (collapsed[tabId] === true && !hasActive) {
      group.classList.add('collapsed');
    }
  });
});
