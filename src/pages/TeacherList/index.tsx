import React, { useState } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';

import { Container, ScrollTeacherList, SearchForm, Label, Input, InputGroup, InputBlock, SubmitButton, SubmitButtonText } from './styles';
import TeacherItem from '../../components/TeacherItem';

import { Feather } from '@expo/vector-icons';

const TeacherList: React.FC = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }


  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function handleFiltersSubmit() {
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    })

    console.log(response.data);

    setTeachers(response.data);
  }

  return (
    <Container>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        )}
      >
        { isFiltersVisible && (
          <SearchForm>
            <Label>Matéria</Label>
            <Input
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
              value={subject}
              onChangeText={text => setSubject(text)}
            />

            <InputGroup>
              <InputBlock>
                <Label>Dia da semana</Label>
                <Input
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                />
              </InputBlock>

              <InputBlock>
                <Label>Horário</Label>
                <Input
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                  value={time}
                  onChangeText={text => setTime(text)}
                />
              </InputBlock>
            </InputGroup>

            <SubmitButton onPress={handleFiltersSubmit}>
              <SubmitButtonText>Filtrar</SubmitButtonText>
            </SubmitButton>

          </SearchForm>
        )}
      </PageHeader>

      <ScrollTeacherList contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 16,
      }}>
        {teachers.map(teacher => <TeacherItem />)}
      </ScrollTeacherList>
    </Container>
  );
}

export default TeacherList;
