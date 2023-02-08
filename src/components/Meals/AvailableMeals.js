import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://food-order-app-798cb-default-rtdb.firebaseio.com/meals.json');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    }

    fetchMeals().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    
  }, []);

    const mealsList = meals.map(meal => (
        <MealItem 
            id={meal.id}
            key={meal.id}
            description={meal.description}
            name={meal.name}
            price={meal.price}
        />
    ));

    if (isLoading) {
      return (
        <section className={classes.mealsLoading}>
          <p>Loading...</p>
        </section>
      );
    }

    if (httpError) {
      return (
        <section className={classes.mealsError}>
          <p>{httpError}</p>
        </section>
      );
    }

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;