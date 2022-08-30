import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';

import { catchPokemon, renamePokemon, releasePokemon } from './action';
import { selectGetName } from './selectors'

import './style.css';

const PokemonList = ({getName}) => {
  const dispatch = useDispatch();
  const [dataList, setDataList] = useState([]);
  const [dataDetail, setDataDetail] = useState({
    name: '',
    moves: '',
    types: '',
    img: ''
  });
  const [showPage, setShowPage] = useState('pokemonList');
  const [myPokemon, setMyPokemon] = useState([]);
  
  const [modalState, setModalState] = useState('none');
  const [modalState2, setModalState2] = useState('none');
  const [modalWord, setModalWord] = useState('');
  const [id, setId] = useState(0);
  const [editedName, setEditedName] = useState({});

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0')
      .then(res => {
        res.data.results.forEach(el => {
          axios
          .get(el.url)
          .then(eachEl => {
            if(eachEl.data.name.includes('nidoran')) return
            setDataList(arrList => [...arrList, {
              name: eachEl.data.name,
              img: eachEl.data.sprites.other['official-artwork'].front_default
            }])
          })
        })
      })
  }, [])

  useEffect(() => {
    const detailNameStr = dataDetail.name.replace(/[0-9-]/g, '')
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${detailNameStr}`)
      .then(x => {
          setDataDetail({
            ...dataDetail,
            moves: x.data.moves,
            types: x.data.types,
            img: x.data.sprites.other['official-artwork'].front_default
          })
       })
  }, [showPage])

  const catchPokemonHandler = () => {
    dispatch(catchPokemon({},
      () => {
        setId(id + 1)
        setMyPokemon(arr => [...arr, { 
          ...dataDetail,
          id,
          seq: 0
        }]);
        setModalState('block');
        setModalWord('Success catch pokemon');
      },
      () => {
        setModalState('block');
        setModalWord('Failed catch pokemon');
      }));
  }

  const renamePokemonHandler = () => {
    dispatch(renamePokemon({
        name: editedName && editedName.nameEdit ? editedName.nameEdit : editedName.name,
        seq: getName.seq === '' ? 0 : getName.seq
      },
      () => {
        setEditedName({
          ...dataDetail,
          nameEdit: getName.setName.name,
          seq: getName.setName.seq
        })
        const changeName = myPokemon.map(el => {
          if(el.id === editedName.id) {
            return {
              ...editedName
            }
          }
          return el
        })
        setMyPokemon(changeName); 
      },
      () => {})
    );
  }

  const releasePokemonHandler = () => {
    dispatch(releasePokemon({},
      () => {
        setMyPokemon(myPokemon.filter(item => {
          return item.id !== dataDetail.id
        }));
        setModalState('block');
        setModalWord('Success release pokemon');
      },
      () => {
        setModalState('block');
        setModalWord('Failed release pokemon');
      }));
  }

  const nodeColor = (x, size) => ({
    backgroundImage: `url(${x})`,
    backgroundSize: size,
    backgroundRepeat: 'no-repeat'
  });

  const popUp = () => {
    const display = {
      display: modalState
    }
    return (
      <>
        <div className='overlay'style={display}></div>
        <div className='pop-up' style={display}>
          <div>
            <p className=''>{modalWord}</p>
            <button onClick={() => setModalState('none')}>close</button>
          </div>
        </div>

      </>
    )
  }

  const popUp2 = () => {
    const display = {
      display: modalState2
    }
    return (
      <>
        <div className='overlay'style={display}></div>
        <div className='pop-up' style={display}>
          <div>
            <button onClick={() => {
              renamePokemonHandler();
              setModalState2('none')
            }}>Rename</button>
            <button onClick={() => {
              releasePokemonHandler();
              setModalState2('none');
            }}>Release</button>
            <button onClick={() => {
              setModalState2('none')
            }}>Cancel</button>
          </div>
        </div>
        
      </>
    )
  }
  const pokemonListPage = () => {
    return (
      <div>
        <p className="page">POKEMON LIST</p>
        <div className='container'>
        {
          dataList.length !== 0 && dataList.map(el => (
            <div 
              className="list"
              style={nodeColor(el.img, '5rem 5rem')}
              onClick={() => {
                setDataDetail({...el})
                setShowPage('pokemonDetail')
              }}
            >
              <p>{el.name}</p>
            </div>
          ))
        }
      </div>
      <div className='button-container'>
        <button className='pokemon-button' onClick={() => setShowPage('myPokemonList')}>My Pokemon List</button>
      </div>
      </div>
    )
  }

  const pokemonDetailPage = () => {
    return (
      <div>
        <p className="page">POKEMON DETAIL</p>
        <div className='container-detail'>
        {
          dataDetail.moves && dataDetail.types && (<>
            <div
              className='detail-img'
            >
              <div
                className='detail-img2'
                style={nodeColor(dataList.find(el => el.name === dataDetail.name).img, '12rem 12rem')}
              >
                <p>{dataDetail.name}</p>
              </div>
              <div className='detail-button'>
                <button 
                  className='catch-button'
                  onClick={catchPokemonHandler}
                >
                  Catch Pokemon
                </button>
                <button onClick={() => setShowPage('myPokemonList')}>My Pokemon List</button>
                <button onClick={() => setShowPage('pokemonList')}>Pokemon List</button>
              </div>
            </div>
            <div
              className='detail-desc'
            >
              <div className='types'>
                Types:
              {
                dataDetail.types.map(el => (
                  <li>
                    {el.type.name}
                  </li>
                ))
              }
              </div>
              <div className='moves'>
                Moves:
              {
                dataDetail.moves.map(el => (
                  <li>
                    {el.move.name}
                  </li>
                ))
              }
              </div>
            </div>
          </>)
        }
        </div>
      </div>
    )
  }

  const myPokemonListPage = () => {
    return (
      <div>
        <p className="page">MY POKEMON LIST</p>
        <div className='container'>
        {
          myPokemon.length !== 0 && myPokemon.map(el => (
            <div 
              className="list"
              style={nodeColor(el.img, '5rem 5rem')}
              onClick={() => {
                setDataDetail({...el})
                if(editedName.name && editedName.name.includes(el.name) &&
                editedName.id === el.id) {
                  setEditedName({...el, ...editedName })
                } else {
                  setEditedName({...el })
                }
                setModalState2('block');
              }}
            >
              <p>{el.nameEdit ? el.nameEdit : el.name}</p>
            </div>
          ))
        }
      </div>
      <div className='button-container'>
        <button className='pokemon-button' onClick={() => setShowPage('pokemonList')}>Pokemon List</button>
      </div>
      </div>
    )
  }

  const pageHandler = () => {
    switch (showPage) {
      case 'pokemonList':
        return pokemonListPage();
      case 'pokemonDetail':
        return pokemonDetailPage();
      case 'myPokemonList':
        return myPokemonListPage();
      default:
        return pokemonListPage();
    }
  }

  return (
    <>
      {pageHandler()}
      {popUp()}
      {popUp2()}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  getName: selectGetName,
});

export default connect(mapStateToProps)(PokemonList);