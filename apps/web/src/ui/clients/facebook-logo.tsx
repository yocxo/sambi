import { cn } from '@yocxo/ui';

const FacebookLogo = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Facebook logo"
      viewBox="0 0 502.857 96"
      {...props}
      className={cn('h-12 w-28 fill-muted-foreground', props.className)}
    >
      <path d="M258.88 46.629c-4.151 0-7.145 1.312-10.176 2.651v30.272c2.903.27 4.571.27 7.328.27 9.966 0 11.337-4.402 11.337-10.551v-14.46c0-4.539-1.563-8.183-8.489-8.183Zm-66.185-1.655c-6.917 0-8.494 3.662-8.494 8.197v2.546h16.978v-2.546c0-4.535-1.577-8.197-8.485-8.197ZM64.476 76.485c0 3.589 1.755 5.454 5.627 5.454 4.16 0 6.615-1.307 9.646-2.651v-7.177h-9.075c-4.302 0-6.194.768-6.194 4.375Zm258.788-29.861c-6.926 0-9.326 3.648-9.326 8.187v16.567c0 4.549 2.4 8.206 9.326 8.206 6.907 0 9.326-3.657 9.326-8.206V54.811c0-4.539-2.418-8.183-9.326-8.183ZM30.537 95.063H10.171V47.525H0v-16.38h10.176v-9.838C10.176 7.945 15.918 0 32.238 0h13.586v16.384H37.33c-6.354 0-6.77 2.286-6.77 6.56l-.027 8.201H45.92l-1.801 16.379H30.533v47.538Zm69.586.123H83.149l-.731-4.142a40.046 40.046 0 0 1-19.223 4.814c-12.448 0-19.072-8.023-19.072-19.109 0-13.088 7.73-17.755 21.559-17.755h14.075v-2.83c0-6.674-.795-8.64-11.442-8.64H50.907l1.701-16.379h19.026c23.36 0 28.489 7.122 28.489 25.152v38.889Zm57.701-46.459c-10.56-1.746-13.591-2.13-18.67-2.13-9.129 0-11.886 1.943-11.886 9.417v14.144c0 7.474 2.757 9.426 11.886 9.426 5.079 0 8.11-.393 18.67-2.149v15.982c-9.248 1.998-15.273 2.523-20.366 2.523-21.861 0-30.546-11.086-30.546-27.109V57.357c0-16.027 8.686-27.136 30.546-27.136 5.093 0 11.118.526 20.366 2.537v15.968Zm63.717 20.11h-37.335v1.321c0 7.474 2.757 9.426 11.886 9.426 8.197 0 13.207-.393 23.744-2.149v15.982c-10.162 1.998-15.461 2.523-25.435 2.523-21.861 0-30.555-11.086-30.555-27.109v-13.12c0-14.011 6.45-25.49 28.85-25.49s28.846 11.346 28.846 25.495v13.12Zm66.185.302c0 15.483-4.585 26.775-32.375 26.775-10.039 0-15.922-.85-26.999-2.496V4.919l20.347-3.273v30.958c4.398-1.577 10.094-2.377 15.269-2.377 20.361 0 23.753 8.8 23.753 22.949v15.963Zm65.243.338c0 13.353-5.714 26.309-29.632 26.309-23.927 0-29.751-12.955-29.751-26.309V56.581c0-13.362 5.824-26.318 29.751-26.318 23.918 0 29.632 12.955 29.632 26.318v12.891Zm65.202 0c0 13.353-5.723 26.309-29.637 26.309-23.927 0-29.751-12.955-29.751-26.309V56.581c0-13.362 5.824-26.318 29.751-26.318 23.913 0 29.637 12.955 29.637 26.318v12.891Zm66.912 25.586h-22.062L444.36 65.015v30.048H424V4.919l20.361-3.278v58.034l18.661-28.526h22.062l-20.37 31.131 20.37 32.777Zm-96.621-48.439c-6.917 0-9.317 3.648-9.317 8.187v16.567c0 4.549 2.4 8.206 9.317 8.206 6.903 0 9.349-3.657 9.349-8.206V54.811c0-4.539-2.441-8.183-9.349-8.183ZM496.7 83.849c3.429 0 6.158 2.697 6.158 6.066 0 3.419-2.734 6.085-6.185 6.085-3.433 0-6.217-2.665-6.217-6.085 0-3.369 2.784-6.066 6.217-6.066h.027Zm-.027.942c-2.761 0-5.019 2.295-5.019 5.12 0 2.88 2.258 5.147 5.047 5.147 2.789.027 5.015-2.263 5.015-5.12 0-2.853-2.226-5.147-5.015-5.147h-.027Zm-1.17 8.654h-1.115v-6.766c.585-.082 1.143-.16 1.984-.16 1.061 0 1.751.215 2.181.512.411.297.631.754.631 1.399 0 .891-.608 1.426-1.362 1.646v.05c.613.11 1.029.645 1.17 1.641.165 1.051.334 1.454.443 1.673h-1.17c-.165-.219-.334-.837-.475-1.728-.165-.859-.613-1.184-1.509-1.184h-.777v2.917Zm0-3.749h.809c.914 0 1.696-.32 1.696-1.161 0-.594-.439-1.184-1.691-1.184-.366 0-.622.027-.814.055v2.295Z" />
    </svg>
  );
};

export default FacebookLogo;
