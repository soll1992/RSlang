import * as React from 'react';
import { FC, useRef, useState, useEffect } from 'react';
import './home.scss';
import './wave.scss';
import man from '../../../assets/img/home/16.png'
import img1 from '../../../assets/img/home/5.png'
import img2 from '../../../assets/img/home/18.png'
import img3 from '../../../assets/img/home/11.png'


type Props = {

};

const Home: FC<Props> = () => {

  return (
    <div className='home-wrap'>
      <section id='home' className="home section">
        <div className='home-content-wrap'>
          <div className='home-title-wrap'>
            <h1 className='home-title'>Учи английский язык с RSLang</h1>
            <p className='home-subtitle-text'>Запоминание английских слов может быть увлекательным и простым. Играйте в миниигры, слушайте произношение, совершенствуйте свои знания. Бесплатно. На любом устройстве.</p>
          </div>
          <div className='home-aside'>
            <img src={man} alt="" width={300}></img>

          </div>

        </div>
        <div className='app-functional'>
          <h2 className='app-functional-title subtitle'>Функционал приложения</h2>
          <div className='app-functional-container'>
            <div className="app-functional-item">
              <div className='app-functional-img-wrap'>
                <img className="app-functional-img" src={img1} alt=""></img>
              </div>
              <h3 className='app-functional-item__title'>Учебник</h3>
              <p className='app-functional-item__text'>6 разделов с разным уровнем сложности, в каждом разделе по 600 слов.</p>
              <button>Открыть учебник</button>
            </div>
            <div className="app-functional-item">
              <div className='app-functional-img-wrap'>
                <img className="app-functional-img" src={img2} alt=""></img>
              </div>
              <h3 className='app-functional-item__title'>Миниигры</h3>
              <p className='app-functional-item__text'>Для изучения и закрепления слов в приложении есть игры Спринт и Аудиовызов, которые помогут вам в игровой форме «прокачать» словарный запас.</p>
              <button>Выбрать игру</button>
            </div>
            <div className="app-functional-item">
              <div className='app-functional-img-wrap'>
                <img className="app-functional-img" src={img3} alt=""></img>
              </div>
              <h3 className='app-functional-item__title'>Статистика</h3>
              <p className='app-functional-item__text'>Весь прогресс обучения можно посмотреть в статистике, где представлены данные как за текущий день, так и за весь период обучения.</p>
              <button>Открыть статистику</button>
            </div>
          </div>
        </div>
        {/* <p>Ни для кого не является секретом тот факт, что самым популярным языком в мире является английский язык.</p>
        <h2 className='home-title'>Почему английский нужно учить прямо сейчас?</h2>
        <ul>
          <li>Английский — язык международной торговли, туризма, политики, Интернета и не только. Это первый и главный язык мирового общения. Во многих странах его принято считать вторым после национального языка. На английском языке говорит более 1 миллиарда человек. Вы можете легко путешествовать, не имея проблем с пониманием речи в других странах.</li>
          <li>Знание английского увеличивает Вашу зарплату на 20-30%, а иногда является обязательным требованием. Это Ваше достоинство при поиске работы. Это Ваш помощник при продвижении по карьерной лестнице.</li>
          <li>Кроме того, английский язык может стать неплохим хобби. Ведь так приятно что-то прочитать на чужом языке, понять культуру чужой страны или просто разобраться, о чем идет речь в любимой песне. Основная масса информации (текст, видео) выложена на английском языке, и лишь некоторая часть переводится на русский спустя некоторое время с потерей смысла при переводе.</li>
        </ul> */}

        {/* <ul>
          <li>Около 1,5 млрд. населения Земли говорит на английском</li>
          <li>Английский — официальный язык в 54 странах, вы сможете свободно путешествовать по миру </li>
          <li>Согласно <a href="https://w3techs.com/technologies/overview/content_language">статистике</a>, изучив английский язык, вам откроется 64% всего интернета для получения новой полезной информации</li>
          <li>На основе <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3322418/">исследований</a>, знание двух языков и более повышает когнитивные способности и память</li>
          <li>Согласно следующим <a href='https://journals.lww.com/alzheimerjournal/Abstract/2020/07000/Conversion_of_Mild_Cognitive_Impairment_to.6.aspx'>исследованиям</a>, если вы владеете двумя и более языками, у вас значительно снижается риск развития болезни Альцгеймера и слабоумия</li>
          <li>Он позволит полноценно себя реализовать, получить хорошо оплачиваемую работу и возможность работать в международных компаниях</li>
        </ul> */}
      </section>
      {/* <div className="wrap__wavebar">
        <div className="wavebar-con-container-master">
          <div className="wavebar-con-wrap">
            <div className="wavebar-svg-object"></div>
            <div className="wavebar-svg-object"></div>
          </div>
        </div>
      </div> */}
    </div>
  );

}

export default Home;
