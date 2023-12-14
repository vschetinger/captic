const {Color, Vector3} = THREE

function queryGPT(prompt) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
  
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response.choices[0].text);
            resolve(response.choices[0].text);
          } else {
            console.error('Error:', xhr.status, xhr.responseText);
            reject('Error: ' + xhr.status);
          }
        }
      }
    
      xhr.open("POST", "https://api.openai.com/v1/engines/davinci/completions", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer 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"); // Replace with your actual API key
    
      var data = JSON.stringify({
        prompt: prompt,
        max_tokens: 50
      });
    
      xhr.send(data);
    });
  }
  
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

  async showText() {
    const entity = document.createElement('a-entity')
    const gptext = await queryGPT("Hello World!")
    entity.object3D.position.set(0, 1.3, 0)
  
    const itemIday = document.createElement('a-entity')
    itemIday.setAttribute('troika-text', {
      color: '#fff',
      align: 'left',
      fontSize: 0.2,
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