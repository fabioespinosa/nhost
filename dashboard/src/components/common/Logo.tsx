import { useTheme } from '@mui/material';
import type { ForwardedRef, SVGProps } from 'react';
import { forwardRef } from 'react';

function Logo(
  props: SVGProps<SVGSVGElement>,
  ref: ForwardedRef<SVGSVGElement>,
) {
  const theme = useTheme();

  return (
    <svg
      ref={ref}
      width="32"
      height="34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Logo of Nhost"
      {...props}
    >
      <path
        d="M29.013 7.305 17.12.46a3.489 3.489 0 0 0-3.461 0 3.458 3.458 0 0 0-1.729 2.984v.894l-.775-.447a3.489 3.489 0 0 0-3.461 0 3.459 3.459 0 0 0-1.729 2.99v.892l-.775-.446a3.488 3.488 0 0 0-3.46 0A3.459 3.459 0 0 0 0 10.313v21.443a1.624 1.624 0 0 0 1.803 1.612c.303-.033.591-.15.83-.34l5.898-4.636 9.096 5.233a1.652 1.652 0 0 0 1.627 0c.501-.29.814-.826.814-1.404V19.319a5.952 5.952 0 0 0-2.983-5.149l-2.983-1.716V3.448a1.288 1.288 0 0 1 1.291-1.286c.227 0 .449.06.645.173L27.93 9.177a3.795 3.795 0 0 1 1.898 3.276V28.52c0 .458-.248.884-.645 1.113l-3.151 1.813V15.884a5.953 5.953 0 0 0-2.983-5.148L15.73 6.524V9.02l6.237 3.59a3.793 3.793 0 0 1 1.898 3.275V32.38c0 .575.311 1.115.813 1.405a1.653 1.653 0 0 0 1.628 0l3.965-2.282A3.457 3.457 0 0 0 32 28.517V12.448a5.968 5.968 0 0 0-2.987-5.143ZM15.995 16.04a3.792 3.792 0 0 1 1.898 3.277v11.97l-7.53-4.333 2.417-1.898a3.424 3.424 0 0 0 1.318-2.707v-7.397l1.898 1.09v-.002Zm-4.066-2.34v8.645c0 .397-.18.766-.491 1.01l-9.27 7.283V10.31a1.286 1.286 0 0 1 1.29-1.286c.226 0 .448.06.644.173l1.863 1.07v15.325l2.168-1.704V6.878a1.286 1.286 0 0 1 1.29-1.285c.227 0 .45.06.645.173l1.861 1.07v4.367L9.762 9.955v2.498l2.17 1.249h-.003Z"
        fill={
          theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main
        }
      />
    </svg>
  );
}

export default forwardRef(Logo);
