import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Search } from 'lucide-react';
import usePeopleData from '../../hooks/usePeopleList';
import { Card, Input, Loading, Pagination } from '../../components';
import { renderPersonInfo } from '../../constants/renderPersonInfo';
import { Result } from '../../hooks/types';

interface PeopleProps {
  endpoint: string;
}

const People: React.FC<PeopleProps> = ({ endpoint }) => {
  const { register, handleSubmit } = useForm<{ search: string }>();
  const [searchTerm, setSearchTerm] = useState("");

  const onSubmit = (data: { search: string }) => {
    setSearchTerm(data.search);
  };

  const { query, loading } = usePeopleData(endpoint, searchTerm);

  return (
    <div className="bg-blue-950 min-h-screen flex flex-col items-center p-4">
      <div className="max-w-screen-lg">
        <div className="w-full flex flex-col items-center">
          <h2 className="text-white text-base font-bold text-center md:text-start">
          Search by peoples
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="gap-2 w-full">
            <Input label="" placeholder='Buscar' {...register("search")} rightIcon={<Search />} />
          </form>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Loading />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {query?.results.map((people: Result) => {
                return (
                  <Card key={people.name} title={people.name}>
                    <div className="h-full w-full">
                    {renderPersonInfo("Height", people.height)}
                    {renderPersonInfo("Mass", people.mass)}
                    {renderPersonInfo("birth", people.birth_year)}
                    {renderPersonInfo("Gender", people.gender)}
                    </div>
                  </Card>
                );
              })}
            </div>
            {!!query?.next && (
              <Pagination hasNext={!!query?.next} hasPrevious={!!query?.previous} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default People;
