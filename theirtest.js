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

  showText = () => {
    const entity = document.createElement('a-entity')
      entity.object3D.position.set(0, 1.3, 0)

      const itemIday = document.createElement('a-entity')
      itemIday.setAttribute('troika-text', {
        color: '#fff',
        align: 'left',
        fontSize: 0.2,
        value: 'Hello World',
        fillOpacity: '1',
      })
      itemIday.object3D.position.set(0, 0.2, 0)
      entity.appendChild(itemIday)


      this.el.appendChild(entity)
  }

  #showPosition = (data) => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    }

    fetch(
      'https://www.7timer.info/bin/api.pl?lon=' +
        data.coords.longitude +
        '&lat=' +
        data.coords.latitude +
        '&product=civillight&output=json',
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => {
        this.#showWeather(JSON.parse(result).dataseries)
      })
      .catch((error) => console.log('error', error))
  }

  #showWeather = (dataseries) => {
    const entity = document.createElement('a-entity')
      entity.object3D.position.set(0, 1.3, 0)

      const itemIday = document.createElement('a-entity')
      itemIday.setAttribute('troika-text', {
        color: '#fff',
        align: 'left',
        fontSize: 0.2,
        value: 'Hello World',
        fillOpacity: '1',
      })
      itemIday.object3D.position.set(0, 0.2, 0)
      entity.appendChild(itemIday)


      this.el.appendChild(entity)
  }

  #connected = () => {
    console.info('connected')
  }

  #increment = () => {
    this.state.count = this.state.count + 1
    this.requestUpdate()
  }

  #startStop = () => {
    this.state.toggle = !this.state.toggle
    console.info(this.state.toggle)
  }

  render() {
    const {count} = this.state

    return html`


        <a-entity
        id="boxRounded"
        position="1 1.2 -4"
        static-body="shape:box;"
        box-rounded="material:standard;color:lightblue;width:1;depth:1;height:1;borderRadius:0.2;opacity:0.8;"
        class="interactable"
        >
      </a-entity>
    `
  }
}

export default SampleElement