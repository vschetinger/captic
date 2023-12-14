const {Color, Vector3} = THREE
  
class SampleElement extends CapElement {
  schema = {}
  init() {
    this.state = {
      count: 0,
      toggle: false,
    }
    document.body.addEventListener('connected', this.#connected, {once: true})
    this.showText()
  }

  tick = (time, deltatime) => {}

  remove = () => {}

  async queryChatGPT(prompt) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`, // Replace with your actual API key
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: "You are a helpful assistant." },
                   { role: "user", content: prompt }]
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }

  async showText() {
    const entity = document.createElement('a-entity')
    const gptext = await queryChatGPT("Hello World!")
    entity.object3D.position.set(0, 1.3, 0)
  
    const itemIday = document.createElement('a-entity')
    itemIday.setAttribute('troika-text', {
        color: '#f0f',
        align: 'left',
        fontSize: 0.2,
        maxWidth: 2, // Set the maximum width of the text box (in meters)
        wrapCount: 30, // Adjust this value as needed for the desired wrapping
        value: gptext,
        fillOpacity: '1'
      })
      
    itemIday.object3D.position.set(0, 0.2, 0)
    entity.appendChild(itemIday)
    this.el.appendChild(entity)
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