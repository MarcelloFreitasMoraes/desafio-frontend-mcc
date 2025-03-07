import React, { useState } from 'react';
import { Card, Input, Loading, Pagination } from '../../components';
import usePeopleData from '../../hooks/usePeopleList';
import { useForm } from 'react-hook-form';
import { Search } from 'lucide-react';
import { renderPersonInfo } from '../../constants/renderPersonInfo';
import { FilmsData } from '../../hooks/types';

interface FilmsProps {
  endpoint: string;
}

const Films: React.FC<FilmsProps> = ({ endpoint }) => {
  const { register, handleSubmit } = useForm<{ search: string }>();
  const [searchTerm, setSearchTerm] = useState("");

  const onSubmit = (data: { search: string }) => {
    setSearchTerm(data.search);
  };

  const { query, loading } = usePeopleData(endpoint, searchTerm);

  return (
    <div className="bg-blue-950 min-h-screen flex flex-col items-center p-4">
      <div className="max-w-screen-lg">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Loading />
          </div>
        ) : (
          <>
            <div className="w-full flex flex-col items-center">
              <h2 className="text-white text-base font-bold text-center md:text-start">
                Search by films
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="gap-2 w-full">
                <Input label="" placeholder='Buscar' {...register("search")} rightIcon={<Search />} />
              </form>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {query?.results.map((people: FilmsData) => {

                return (
                  <Card key={people.title} title={people.title}>
                    <div className="h-full w-full">
                      {renderPersonInfo("Director", people.director)}
                      {renderPersonInfo("Launch", people.release_date)}
                      {renderPersonInfo("Producer", people.producer)}
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        )}
        {!!query?.next && (
          <Pagination hasNext={!!query?.next} hasPrevious={!!query?.previous} />
        )}
      </div>
    </div>
  );
};

export default Films;