import { ref} from 'vue';

export function useCounter() {
    const count = ref(0);
   
    const double = () => {
        count.value===0?alert("Count Must be greater than 0"):count.value *= 2;
    };

    const half=()=>{
        count.value<=0?alert('Count cannot be less than 0'):count.value /= 2;
    }

    const increment = () => {
        count.value++;
    };

    const decrement = () => {
        count.value<=0?alert('Count cannot be less than 0'):count.value--;
    };

    return {
        count,
        double,
        increment,
        decrement,
        half
    };
}
