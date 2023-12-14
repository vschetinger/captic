const {Color, Vector3} = THREE;

class HelloWorldElement extends CapElement {
  init() {
    // Create a new A-Frame entity for the text
    const textEntity = document.createElement('a-entity');
    textEntity.setAttribute('troika-text', {
      color: '#fff',
      align: 'center',
      fontSize: 0.5,
      value: 'Hello World',
      fillOpacity: 1,
    });
    textEntity.object3D.position.set(0, 1, -3);

    // Append the text entity to this.el, which is likely the main element in the captic.io environment
    this.el.appendChild(textEntity);
  }

  // Keeping the tick, remove, and other methods as in the original code in case they are part of lifecycle management in captic.io
  tick = (time, deltatime) => {}
  remove = () => {}

  // No changes to render method from the original code
  render() {
    return html`
      <!-- Original render content here, if any -->
    `;
  }
}

export default HelloWorldElement;
