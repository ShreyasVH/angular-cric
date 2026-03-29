import { Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { getDetails } from '../../../endpoints/players';

@Component({
    selector: 'app-player-details',
    templateUrl: './details.component.html',
    imports: [CommonModule]
})
export class PlayerDetailsComponent {

    loaded = signal<boolean>(false);
    details = signal<any>({});

    async ngOnInit(): Promise<void> {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const id = parseInt(urlSearchParams.get('id') ?? '0', 10);
        console.log(id);

        const playerDetailsResponse = await getDetails(id);
        this.details.set(playerDetailsResponse.data.data);

        this.loaded.set(true);
    }

    getBattingGameTypes = () => {
        return Object.keys(this.details().battingStats);
    }

}