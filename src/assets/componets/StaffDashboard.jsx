import "./StaffDashboard.css";

export default function StaffDashboard({ menuSections, setMenuSections }) {
  const handleItemChange = (sectionIndex, itemIndex, field, value) => {
    setMenuSections((current) => {
      const updated = current.map((section, sIndex) => {
        if (sIndex !== sectionIndex) return section;
        return {
          ...section,
          items: section.items.map((item, iIndex) => {
            if (iIndex !== itemIndex) return item;
            return {
              ...item,
              [field]: value,
            };
          }),
        };
      });
      return updated;
    });
  };

  const handleAddItem = (sectionIndex) => {
    setMenuSections((current) =>
      current.map((section, sIndex) => {
        if (sIndex !== sectionIndex) return section;
        return {
          ...section,
          items: [
            ...section.items,
            {
              name: "New item",
              details: "Describe this menu item",
              price: "0.00",
            },
          ],
        };
      }),
    );
  };

  const handleRemoveItem = (sectionIndex, itemIndex) => {
    setMenuSections((current) =>
      current.map((section, sIndex) => {
        if (sIndex !== sectionIndex) return section;
        return {
          ...section,
          items: section.items.filter((_, iIndex) => iIndex !== itemIndex),
        };
      }),
    );
  };

  return (
    <section className="dashboard-section">
      <div className="dashboard-header">
        <div>
          <span className="dashboard-eyebrow">Staff Dashboard</span>
          <h2>Update menu items and pricing without code.</h2>
        </div>
        <p>
          Social media managers can edit item names, descriptions and prices here
          instantly. Changes persist locally and refresh the public menu view.
        </p>
      </div>

      <div className="dashboard-grid">
        {menuSections.map((section, sectionIndex) => (
          <div key={section.title} className="dashboard-card">
            <div className="dashboard-card-header">
              <h3>{section.title}</h3>
              <button
                type="button"
                className="dashboard-add-button"
                onClick={() => handleAddItem(sectionIndex)}>
                + Add item
              </button>
            </div>
            <p>{section.description}</p>

            <div className="dashboard-items">
              {section.items.map((item, itemIndex) => (
                <div key={`${section.title}-${itemIndex}`} className="dashboard-item">
                  <div className="dashboard-item-row">
                    <label>
                      Name
                      <input
                        value={item.name}
                        onChange={(event) =>
                          handleItemChange(sectionIndex, itemIndex, "name", event.target.value)
                        }
                      />
                    </label>
                    <label>
                      Price
                      <input
                        value={item.price}
                        onChange={(event) =>
                          handleItemChange(sectionIndex, itemIndex, "price", event.target.value)
                        }
                        inputMode="decimal"
                      />
                    </label>
                  </div>
                  <label>
                    Description
                    <textarea
                      rows="2"
                      value={item.details}
                      onChange={(event) =>
                        handleItemChange(sectionIndex, itemIndex, "details", event.target.value)
                      }
                    />
                  </label>
                  <button
                    type="button"
                    className="dashboard-remove-button"
                    onClick={() => handleRemoveItem(sectionIndex, itemIndex)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
