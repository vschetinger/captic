const {Color, Vector3} = THREE
  
class SampleElement extends CapElement {
  schema = {}
  init() {
    this.state = {
      count: 0,
      toggle: false,
    }
    document.body.addEventListener('connected', this.#connected, {once: true})
    this.showDalleImage()
  }

  tick = (time, deltaTime) => {
    if (this.sphereEntity) {
        this.sphereEntity.object3D.rotation.y += 0.005; // Adjust rotation speed
    }
}

  remove = () => {}

  async queryDalle(prompt) {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`, // Replace with your actual API key
        },
        body: JSON.stringify({
            model: "dall-e-3", // Replace with the correct DALL-E model name
            prompt: prompt,
            n: 1, // Number of images to generate
            response_format: "b64_json" // Requesting base64-encoded format
        }),
    });

    const data = await response.json();
    console.info(data);
    // Accessing the base64-encoded image string
    return data.data[0].b64_json; // Adjust based on the actual structure of the DALL-E response
}

async showDalleImage() {
    const entity = document.createElement('a-entity');
    const base64Image = await this.queryDalle("A tileable material-like texture");

    // Convert base64 to data URL
    const dataUrl = `data:image/png;base64,${base64Image}`;

    const sphereEntity = document.createElement('a-entity');
    sphereEntity.setAttribute('geometry', {
        primitive: 'sphere',
        radius: 2 // Adjust radius as needed
    });
    sphereEntity.setAttribute('material', {
        src: dataUrl // Use the data URL here
    });

    sphereEntity.object3D.position.set(0, 1.3, 0); // Adjust position as needed

    // Add rotation animation for spinning effect
    sphereEntity.setAttribute('animation', {
        property: 'rotation',
        to: '0 360 0',
        loop: true,
        dur: 5000 // Duration of one full spin (in milliseconds)
    });

    this.sphereEntity = sphereEntity
    entity.appendChild(sphereEntity);
    this.el.appendChild(entity);
}


  

  #connected = () => {
    console.info('connected')
  }

  render() {
    const {count} = this.state

    return html`
    <a-entity>
      </a-entity>
    `
  }
}

export default SampleElement


