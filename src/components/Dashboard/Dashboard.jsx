import React, { useState, useEffect } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import PropTypes from 'prop-types';
import moment from 'moment';
import { PieChart } from 'react-minimal-pie-chart';
import { nanoid } from 'nanoid';
import frogeApi from '../../services/api';
import { DOLLAR, format, formatPrice, formatLastUpdateAt } from '../../util';
import { StaticImage } from 'gatsby-plugin-image';

const DayDataTile = ({ className, date, volume, price }) => {
  return (
    <div className={`day-data-tile tile ${className ?? ''}`}>
      <h2 id="title">{moment.unix(date).format('ll')}</h2>
      <div>
        <div className="tile-label">Volume</div>
        <span id="value">{DOLLAR + format(volume)}</span>
      </div>
      <div>
        <div className="tile-label">Price</div>
        <span id="value">{DOLLAR + formatPrice(price)}</span>
      </div>
    </div>
  );
};

DayDataTile.propTypes = {
  className: PropTypes.string,
  date: PropTypes.number,
  volume: PropTypes.string,
  price: PropTypes.string,
};

const Tile = ({ prefix, suffix, className, formatValue, title, value }) => {
  return (
    <div className={`tile ${className ?? ''}`}>
      <h2 id="title">{title}</h2>
      <span id="value">
        {prefix ?? ''}
        {formatValue ?? true ? format(value) : value}
        {suffix ?? ''}
      </span>
    </div>
  );
};

Tile.propTypes = {
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.number,
  formatValue: PropTypes.bool,
};

const defaultLabelStyle = {
  fontSize: '4px',
  fill: '#fff',
};

const Dashboard = ({ className }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [stats, setStats] = useState(undefined);
  const [refreshDate, setRefreshDate] = useState(undefined);
  const [lastRequestTimestamp, setRequestTimestamp] = useState(0);

  const getStats = async () => {
    try {
      // Wait 15 seconds
      if (Math.abs(new Date() - lastRequestTimestamp) < 15000) {
        return;
      }

      setIsLoading(true);
      const data = await frogeApi.getStats();
      setRefreshDate(new Date());
      setIsLoaded(true);
      setIsLoading(false);
      setStats(data);
      setRequestTimestamp(new Date());
    } catch (err) {
      setRequestTimestamp(new Date());
      setIsLoading(false);
      setIsLoaded(true);
      setError(err);
    }
  };

  useEffect(() => {
    // Call now
    getStats();

    // Schedule call
    /* if (process.env.GATSBY_AUTO_REFRESH === 'true') {
      const id = setInterval(() => {
        getStats();
      }, process.env.GATSBY_REFRESH_INTERVAL ?? 30000);

      return () => clearInterval(id);
    } */

    return () => {};
  }, []);

  function renderTopHolders() {
    if (!stats.topHolders || !stats.topHolders.totalShare) {
      return (
        <div>
          <h3>Not available</h3>
        </div>
      );
    }
    return (
      <li>
        <Tile title="Top 20 holders" suffix="%" value={stats.topHolders.totalShare} />
      </li>
    );
  }

  function renderHoldersChart() {
    if (!stats.topHolders || !stats.topHolders.holders) {
      return <div />;
    }

    const data = stats.topHolders.holders.slice(1).map((e) => {
      return { title: e.share, value: e.share, color: '#c92238' };
    });

    return (
      <li id="holders-chart">
        <PieChart
          lineWidth={90}
          labelPosition={80}
          labelStyle={{
            ...defaultLabelStyle,
          }}
          label={({ dataEntry }) => dataEntry.value}
          data={data}
          paddingAngle={2}
        />
      </li>
    );
  }

  function renderSocialStats() {
    return (
      <ul>
        <h2 className="header">Social</h2>
        <hr />
        <li>
          <Tile
            title="Twitter followers"
            formatValue={false}
            value={stats.social.twitterFollowers}
          />
        </li>
        <li>
          <Tile title="Reddit members" formatValue={false} value={stats.social.redditSubscribers} />
        </li>
        <li>
          <Tile title="Telegram members" formatValue={false} value={stats.social.telegramMembers} />
        </li>
        <li>
          <Tile title="Coingecko Rank" formatValue={false} value={stats.coingecko.rank} />
        </li>
      </ul>
    );
  }

  function renderStats() {
    return (
      <div className={`${className} dashboard`}>
        <StaticImage
          className="logo"
          placeholder="blurred"
          width={120}
          height={120}
          src="../../images/redpanda.png"
          alt="Redpanda"
        />

        <ul className="mt-4">
          <div id="refresh">
            <Button variant="success" id="refresh-btn" onClick={getStats}>
              {isLoading ? 'Refresh…' : 'Refresh'}
            </Button>
            <div id="last-update-at">
              {refreshDate &&
                `Last update at: ${formatLastUpdateAt(refreshDate)}, caches for 15 seconds.`}
            </div>
          </div>

          <h2 className="header">General</h2>
          <hr />
          <li>
            <Tile title="Holders" formatValue={false} value={stats.tokenInfo.holders} />
          </li>
          <li>
            <Tile
              title="Price"
              prefix={DOLLAR}
              formatValue={false}
              value={formatPrice(stats.price)}
            />
          </li>
        </ul>

        <ul>
          <h2 className="header">Market info</h2>
          <hr />
          <li>
            <Tile title="Market cap" prefix={DOLLAR} value={stats.marketCap} />
          </li>
          <li>
            <Tile title="Liquidity" prefix={DOLLAR} value={stats.totalLiquidityUSD} />
          </li>
          <li>
            <Tile title="Total supply" value={stats.supply.total} />
          </li>
          <li>
            <Tile title="Circulating supply" value={stats.supply.circulating} />
          </li>
          <li>
            <Tile title="Burned supply" value={stats.burn.balance} />
          </li>
        </ul>

        <ul>
          <h2 className="header"> Volume</h2>
          <hr />
          {stats.dayData &&
            stats.dayData.map((dayData) => {
              return (
                <li key={nanoid()}>
                  <DayDataTile
                    date={dayData.date}
                    price={dayData.priceUSD}
                    volume={dayData.dailyVolumeUSD}
                  />
                </li>
              );
            })}
        </ul>

        <ul>
          <h2 className="header">Top holders</h2>
          <hr />
          {renderTopHolders(stats)}
          {renderHoldersChart()}
        </ul>
      </div>
    );
  }

  function renderLoading() {
    return <Spinner id="spinner" animation="border" />;
  }

  function renderError() {
    return <h2 id="error">An error ocurred, please refresh the page</h2>;
  }

  return (
    <section id="hero">
      <div id="dashboard-container">
        <Fade bottom duration={1000} delay={500} distance="30px">
          <div>{!isLoaded && renderLoading()}</div>
          <div>{stats && renderStats()}</div>
          <div>{error && renderError()}</div>
        </Fade>
      </div>
    </section>
  );
};

Dashboard.propTypes = {
  className: PropTypes.string,
};

export default Dashboard;
