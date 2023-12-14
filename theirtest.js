const {Color, Vector3} = THREE

class SampleElement extends CapElement {
  schema = {}
  init() {
    this.state = {
      count: 0,
      toggle: false,
    }
    document.body.addEventListener('connected', this.#connected, {once: true})
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.#showPosition)
    }
  }

  tick = (time, deltatime) => {}

  remove = () => {}

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
    let x = 0
    Object.keys(dataseries).forEach((key) => {
      x = x + 1.1
      const day = dataseries[key].date % 100
      const month = Math.floor((dataseries[key].date % 10000) / 100)
      const year = Math.floor(dataseries[key].date / 10000)
      const idate = new Date(year, month - 1, day)

      const iday = idate.toLocaleString(window.navigator.language, {weekday: 'long'})
      const temp = dataseries[key].temp2m
      const weather = dataseries[key].weather

      const entity = document.createElement('a-entity')
      entity.object3D.position.set(x - 1.2, 1.3, 0)

      const  itemIdate = document.createElement('a-entity')
      itemIdate.setAttribute('troika-text', {
        color: '#fff',
        align: 'left',
        fontSize: 0.1,
        value: idate.toLocaleDateString(),
        fillOpacity: '0.6',
      })
      itemIdate.object3D.position.set(0, 0, 0)
      entity.appendChild(itemIdate)

      const itemIday = document.createElement('a-entity')
      itemIday.setAttribute('troika-text', {
        color: '#fff',
        align: 'left',
        fontSize: 0.2,
        value: iday,
        fillOpacity: '1',
      })
      itemIday.object3D.position.set(0, 0.2, 0)
      entity.appendChild(itemIday)

      const itemTempMax = document.createElement('a-entity')
      itemTempMax.setAttribute('troika-text', {
        color: '#fff',
        align: 'left',
        fontSize: 0.2,
        value: temp.max.toString(),
        fillOpacity: '1',
      })
      itemTempMax.object3D.position.set(0, -0.4, 0)
      entity.appendChild(itemTempMax)

      const itemTempMin = document.createElement('a-entity')
      itemTempMin.setAttribute('troika-text', {
        color: '#fff',
        align: 'left',
        fontSize: 0.2,
        value: temp.min.toString(),
        fillOpacity: '0.6',
      })
      itemTempMin.object3D.position.set(0.2, -0.7, 0)
      entity.appendChild(itemTempMin)

      const itemWeather = document.createElement('a-entity')
      itemWeather.setAttribute('troika-text', {
        color: '#fff',
        align: 'left',
        fontSize: 0.2,
        value: weather,
        fillOpacity: '0.5',
      })
      itemWeather.object3D.position.set(0, -0.9, 0)
      entity.appendChild(itemWeather)

      this.el.appendChild(entity)
    })
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
      <a-rounded
        rotation="0 180 0"
        id="button"
        @click="${this.#startStop}"
        class="ui"
        radius="0.045"
        position="0 2.0 4"
        height="0.082"
        animation__mouseover="property: position; to: 0 2.0 4.01; startEvents: mouseover; dur: 500; easing: easeOutElastic"
        animation__mouseout="property: position; to: 0 2.0 4.005; startEvents: mouseout; dur: 500; easing: easeOutElastic"
        animation__mouseclick="property: position; to: 0 2.0 4.005; startEvents: click; dur: 500; easing: easeOutElastic">
        <a-troika-text value="toggle" font-size="0.05" size="90"> </a-troika-text>
      </a-rounded>
      <a-circle
        class="ui"
        @click="${this.#increment}"
        rotation="0 180 0"
        position="0 1.5 4"
        radius="0.055"
        color="#d0d0d0"
        animation__mouseover="property: position; to: 0 1.5 4.006; startEvents: mouseover; dur: 500; easing: easeOutElastic"
        animation__mouseout="property: position; to: 0 1.5 4.001; startEvents: mouseout; dur: 500; easing: easeOutElastic"
        animation__mouseclick="property: position; to: 0 1.5 4.001; startEvents: click; dur: 500; easing: easeOutElastic">
        <a-troika-text value=${count}> </a-troika-text>
      </a-circle>
      <a-entity
        position="0 10 5"
        rotation="0 0 0"
        animation="property: rotation; to: 0 360 0; loop: true; dur: 10000">
        <a-sphere position="2 1 0" wireframe="true" color="red"></a-sphere>
      </a-entity>
      <a-box
        id="box"
        class="interactable"
        position="0 1.6 5"
        color="#333"
        rotation="0 45 0"
        animation__position="property: position; from: 0 1.6 5; to: 0 1 5; startEvents: click"
        animation__color="property: color; from: #333; to: #ff0000; startEvents: click"
        animation__rotation="property: rotation; from: 0 45 0; to: 0 135 0; startEvents: click"
        animation-toggle="names: animation__position, animation__color, animation__rotation">
      </a-box>


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