import React, { useState } from 'react';
import { Card, Input, Loading, Pagination } from '../../components';
import usePeopleData from '../../hooks/useData';
import { useForm } from 'react-hook-form';
import { Search } from 'lucide-react';
import { renderPersonInfo } from '../../constants/renderPersonInfo';
import { FilmsData } from '../../hooks/types';
import { useLocation } from 'react-router-dom';

const Films: React.FC = () => {
  const location = useLocation();
  const { register, handleSubmit } = useForm<{ search: string }>();
  const [searchTerm, setSearchTerm] = useState("");

  const onSubmit = (data: { search: string }) => {
    setSearchTerm(data.search);
  };

  const { query, loading } = usePeopleData(location.pathname, searchTerm);

  return (
    <div className="bg-blue-950 min-h-screen p-4">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Loading />
          </div>
        ) : (
          <>
            <div className="w-full flex flex-col items-center">
              <h2 className="text-white text-xl font-bold text-center md:text-start">
                Search by films
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="gap-2 w-full">
                <Input label="" placeholder='Search' {...register("search")} rightIcon={<Search />} />
              </form>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {query?.results.map((item: FilmsData) => {

                return (
                  <Card key={item.title} title={item.title}>
                    <div className="h-full w-full">
                      {renderPersonInfo("Director", item.director)}
                      {renderPersonInfo("Launch", item.release_date)}
                      {renderPersonInfo("Producer", item.producer)}
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      {(query?.next || query?.previous) && (
          <Pagination hasNext={!!query?.next} hasPrevious={!!query?.previous} />
      )}
    </div>
  );
};

export default Films;