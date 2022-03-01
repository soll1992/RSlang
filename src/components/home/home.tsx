import * as React from 'react';
import { FC, useEffect } from 'react';
import './home.scss';
import man from '../../assets/img/home/16.webp';
import Functional from './functional';
import Team from './team';

const Home: FC = () => {
  useEffect(() => {
    const hash = window.location.hash === '#/home/team' && window.location.hash;
    if (hash) {
      const el = document.getElementById('team');
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [window.location.hash]);

  return (
    <div className="home-wrap">
      <section id="home" className="home section">
        <div className="home-content-wrap">
          <div className="home-title-wrap">
            <h1 className="home-title">
              Учи английский язык с <span className="home-title__rs">RSLang</span>
            </h1>
            <p className="home-subtitle-text">
              Запоминание английских слов может быть увлекательным и простым. Играйте в миниигры, слушайте произношение,
              совершенствуйте свои знания. Бесплатно. На любом устройстве.
            </p>
          </div>
          <div className="home-aside">
            <img src={man} alt="" height={300}></img>
          </div>
        </div>
        <Functional />
        <div id="team">
          <Team />
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
};

export default Home;
